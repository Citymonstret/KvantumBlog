package xyz.kvantum.blog;

import com.github.intellectualsites.kvantum.api.util.SearchResultProvider;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class BlogEntryProvider implements SearchResultProvider<BlogQuery, BlogEntry>
{

    private List<BlogEntry> entries = new ArrayList<>();

    @Override
    public Collection<? extends BlogEntry> getResults(final BlogQuery query)
    {
        final Collection<BlogEntry> slice = new ArrayList<>();
        for (int i = query.from; i < query.from + query.items && i < entries.size(); i++)
        {
            slice.add( entries.get( i ) );
        }
        return slice;
    }

    void replace(final List<BlogEntry> newEntries)
    {
        this.entries = newEntries;
    }

}
