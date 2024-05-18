export interface album {
    id:                string;
    title:             string;
    description:       string;
    datetime:          number;
    cover:             string;
    cover_edited:      number;
    cover_width:       number;
    cover_height:      number;
    account_url:       string;
    account_id:        number;
    privacy:           string;
    layout:            string;
    views:             number;
    link:              string;
    favorite:          boolean;
    nsfw:              boolean;
    section:           string;
    images_count:      number;
    in_gallery:        boolean;
    is_ad:             boolean;
    include_album_ads: boolean;
    is_album:          boolean;
    deletehash:        string;
    order:             number;
}

