package xyz.kvantum.blog;

import com.github.intellectualsites.kvantum.api.core.ServerImplementation;
import com.github.intellectualsites.kvantum.api.logging.Logger;
import com.github.intellectualsites.kvantum.files.Path;
import lombok.val;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;

class BlogFileStore extends Thread
{

    private final Path folder;
    private final WatchService watcher;
    private final List<Consumer<Collection<Path>>> consumerList = new ArrayList<>();

    BlogFileStore(final Path folder) throws IOException
    {
        this.setDaemon( true );
        this.folder = folder;
        if ( !folder.exists() )
        {
            if ( !folder.create() )
            {
                Logger.error("Failed to create file store..." );
            }
        }
        this.watcher = FileSystems.getDefault().newWatchService();
        folder.getJavaPath().register( watcher, StandardWatchEventKinds.ENTRY_CREATE,
                StandardWatchEventKinds.ENTRY_DELETE, StandardWatchEventKinds.ENTRY_MODIFY );
    }

    public void registerConsumer(final Consumer<Collection<Path>> collectionConsumer)
    {
        this.consumerList.add( collectionConsumer );
    }

    @Override
    public void run()
    {
        this.reactToChange();
        for ( ; ; )
        {
            if ( ServerImplementation.getImplementation().isStopping() )
            {
                break;
            }
            final WatchKey key;
            try {
                key = watcher.take();
            } catch (InterruptedException x) {
                continue;
            }

            for (WatchEvent<?> event: key.pollEvents()) {
                reactToChange();
            }

            // Reset the key -- this step is critical if you want to
            // receive further watch events.  If the key is no longer valid,
            // the directory is inaccessible so exit the loop.
            boolean valid = key.reset();
            if (!valid) {
                break;
            }
        }
    }

    private void reactToChange()
    {
        this.folder.invalidateSubPaths();
        final val collection = findEntries();
        this.consumerList.forEach( consumer -> consumer.accept( collection ) );
    }

    private Collection<Path> findEntries()
    {
        return folder.getSubPaths( file -> file.getExtension().equals( "md" ) );
    }

}
