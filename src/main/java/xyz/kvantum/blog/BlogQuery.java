package xyz.kvantum.blog;

import com.github.intellectualsites.kvantum.api.orm.annotations.KvantumConstructor;
import com.github.intellectualsites.kvantum.api.orm.annotations.KvantumField;
import com.github.intellectualsites.kvantum.api.orm.annotations.KvantumObject;

@KvantumObject
public class BlogQuery
{

    @KvantumField
    public int items;

    @KvantumField( defaultValue = "0" )
    public int from;

    @KvantumConstructor
    public BlogQuery()
    {
    }

}
