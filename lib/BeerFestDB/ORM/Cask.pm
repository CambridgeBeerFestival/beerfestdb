package BeerFestDB::ORM::Cask;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("cask");
__PACKAGE__->add_columns(
  "cask_id",
  { data_type => "INT", default_value => undef, is_nullable => 0, size => 6 },
  "festival_id",
  { data_type => "INT", default_value => undef, is_nullable => 0, size => 3 },
  "gyle_id",
  { data_type => "INT", default_value => undef, is_nullable => 0, size => 6 },
  "distributor_company_id",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 6 },
  "container_size_id",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 4 },
  "bar_id",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 3 },
  "currency_code",
  { data_type => "CHAR", default_value => undef, is_nullable => 0, size => 3 },
  "price",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 10 },
  "stillage_location_id",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 10 },
  "stillage_bay",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 10 },
  "stillage_x_location",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 10 },
  "stillage_y_location",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 10 },
  "stillage_z_location",
  { data_type => "INT", default_value => undef, is_nullable => 1, size => 10 },
  "comment",
  {
    data_type => "TEXT",
    default_value => undef,
    is_nullable => 1,
    size => 65535,
  },
  "external_reference",
  {
    data_type => "VARCHAR",
    default_value => undef,
    is_nullable => 1,
    size => 255,
  },
  "internal_reference",
  {
    data_type => "VARCHAR",
    default_value => undef,
    is_nullable => 1,
    size => 255,
  },
  "is_vented",
  { data_type => "TINYINT", default_value => undef, is_nullable => 1, size => 1 },
  "is_tapped",
  { data_type => "TINYINT", default_value => undef, is_nullable => 1, size => 1 },
  "is_ready",
  { data_type => "TINYINT", default_value => undef, is_nullable => 1, size => 1 },
);
__PACKAGE__->set_primary_key("cask_id");
__PACKAGE__->belongs_to("bar_id", "BeerFestDB::ORM::Bar", { bar_id => "bar_id" });
__PACKAGE__->belongs_to(
  "container_size_id",
  "BeerFestDB::ORM::ContainerSize",
  { container_size_id => "container_size_id" },
);
__PACKAGE__->belongs_to(
  "festival_id",
  "BeerFestDB::ORM::Festival",
  { festival_id => "festival_id" },
);
__PACKAGE__->belongs_to(
  "currency_code",
  "BeerFestDB::ORM::Currency",
  { currency_code => "currency_code" },
);
__PACKAGE__->belongs_to("gyle_id", "BeerFestDB::ORM::Gyle", { gyle_id => "gyle_id" });
__PACKAGE__->belongs_to(
  "stillage_location_id",
  "BeerFestDB::ORM::StillageLocation",
  { stillage_location_id => "stillage_location_id" },
);
__PACKAGE__->has_many(
  "cask_measurements",
  "BeerFestDB::ORM::CaskMeasurement",
  { "foreign.cask_id" => "self.cask_id" },
);


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2010-05-16 17:45:40
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:kLe98PAZn8MPJ99L4/oiFQ


# You can replace this text with custom content, and it will be preserved on regeneration
1;
