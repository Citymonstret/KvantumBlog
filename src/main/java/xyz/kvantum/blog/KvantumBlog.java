package xyz.kvantum.blog;

import com.github.intellectualsites.kvantum.api.core.ServerImplementation;
import com.github.intellectualsites.kvantum.api.util.ParameterScope;
import com.github.intellectualsites.kvantum.api.views.rest.service.SearchService;
import com.github.intellectualsites.kvantum.implementation.KvantumMain;

public class KvantumBlog
{

    public static void main(final String[] args) throws Throwable
    {
        //
        // We'll just pass the arguments to Kvantum
        //
        KvantumMain.main( args );

        final BlogFileStore blogFileStore = new BlogFileStore( ServerImplementation.getImplementation()
                .getFileSystem().getPath( "entries" ) );
        final BlogEntryProvider blogEntryProvider = new BlogEntryProvider();
        final BlogEntryConstructor blogEntryConstructor = new BlogEntryConstructor( blogEntryProvider );

        blogFileStore.registerConsumer( blogEntryConstructor );
        blogFileStore.start();

        SearchService.<BlogQuery, BlogEntry>builder().queryObjectType( BlogQuery.class )
                .parameterScope( ParameterScope.GET ).filter( "entries" ).resultProvider( blogEntryProvider )
                .build()
                .registerHandler();
    }

}
