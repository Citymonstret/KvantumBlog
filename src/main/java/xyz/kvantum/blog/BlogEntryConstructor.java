package xyz.kvantum.blog;

import com.github.intellectualsites.kvantum.files.Path;
import lombok.RequiredArgsConstructor;

import java.util.*;
import java.util.function.Consumer;

@RequiredArgsConstructor
class BlogEntryConstructor implements Consumer<Collection<Path>>
{

    private final BlogEntryProvider blogEntryProvider;

    @Override
    public void accept(final Collection<Path> paths)
    {
        final List<BlogEntry> entries = new ArrayList<>();
        for ( final Path path : paths )
        {
            String content = path.readFile();
            if ( content.isEmpty() )
            {
                continue;
            }
            final String[] lines = content.split( "\n" );
            final String title = lines[0];
            content = content.replaceFirst( title + "\n", "" );
            entries.add( BlogEntry.builder().content( content )
                    .title( title ).created( path.getCreationTime() ).build() );
        }
        entries.sort( Comparator.comparingLong( BlogEntry::getCreated ) );
        this.blogEntryProvider.replace( entries );
    }

}
