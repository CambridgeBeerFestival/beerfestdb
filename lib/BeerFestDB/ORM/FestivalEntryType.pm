package BeerFestDB::ORM::FestivalEntryType;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("festival_entry_type");
__PACKAGE__->add_columns(
  "festival_entry_type_id",
  { data_type => "INT", default_value => undef, is_nullable => 0, size => 4 },
  "description",
  {
    data_type => "VARCHAR",
    default_value => undef,
    is_nullable => 0,
    size => 30,
  },
);
__PACKAGE__->set_primary_key("festival_entry_type_id");
__PACKAGE__->has_many(
  "festival_entries",
  "BeerFestDB::ORM::FestivalEntry",
  {
    "foreign.festival_entry_type_id" => "self.festival_entry_type_id",
  },
);


# Created by DBIx::Class::Schema::Loader v0.04005 @ 2009-09-06 12:24:10
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:OGX6A5+PQfGX38DzJ6GjdQ


# You can replace this text with custom content, and it will be preserved on regeneration
1;
