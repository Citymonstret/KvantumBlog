package xyz.kvantum.blog;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Builder
@Getter
class BlogEntry
{

    private String title;
    private long created;
    private String content;

}
