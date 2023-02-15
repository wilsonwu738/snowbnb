require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Reservation.destroy_all
  Listing.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')
  ApplicationRecord.connection.reset_pk_sequence!('reservations')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  20.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  listing_1 = Listing.create(title: "Cozy Mountain Chalet", 
               description: "Escape to the mountains in this charming chalet located near the ski slopes. Perfect for a winter getaway!",
               lat: 39.742043, 
               long: -104.991531, 
               location: "Breckenridge, CO", 
               nightly_price: 150, 
               max_guests: 6, 
               num_bedrooms: 2, 
               num_beds: 3, 
               num_baths: 2, 
               owner_id: 2, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_2 = Listing.create(title: "Mountain View Lodge", 
               description: "Experience the beauty of the mountains from this spacious lodge. Perfect for a large family or group of friends!",
               lat: 40.027435, 
               long: -105.251961, 
               location: "Nederland, CO", 
               nightly_price: 250, 
               max_guests: 10, 
               num_bedrooms: 4, 
               num_beds: 6, 
               num_baths: 3, 
               owner_id: 2, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_3 = Listing.create(title: "Rustic Mountain Cabin", 
               description: "Unwind in this charming mountain cabin. Enjoy the peace and quiet of the surrounding forest.",
               lat: 39.099727, 
               long: -94.578567, 
               location: "Kansas City, MO", 
               nightly_price: 100, 
               max_guests: 4, 
               num_bedrooms: 1, 
               num_beds: 2, 
               num_baths: 1, 
               owner_id: 3, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_4 = Listing.create(title: "Chalet Les Alpes", 
               description: "Experience the true essence of the Swiss Alps in this cozy chalet. Perfect for a ski holiday!",
               lat: 46.518520, 
               long: 7.638708, 
               location: "Verbier, Switzerland", 
               nightly_price: 200, 
               max_guests: 6, 
               num_bedrooms: 2, 
               num_beds: 4, 
               num_baths: 2, 
               owner_id: 5, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_5 = Listing.create(title: "Mountain View Suite", 
               description: "Wake up to stunning mountain views in this spacious suite. Perfect for a romantic getaway!",
               lat: 46.018680, 
               long: 7.749680, 
               location: "Crans-Montana, Switzerland", 
               nightly_price: 250, 
               max_guests: 2, 
               num_bedrooms: 1, 
               num_beds: 1, 
               num_baths: 1, 
               owner_id: 6, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_6 = Listing.create(title: "Alpine Chalet Zermatt", 
               description: "Escape to the mountains in this charming chalet in Zermatt. Perfect for a ski holiday with friends or family!",
               lat: 46.022881, 
               long: 7.748544, 
               location: "Zermatt, Switzerland", 
               nightly_price: 300, 
               max_guests: 8, 
               num_bedrooms: 3, 
               num_beds: 6, 
               num_baths: 2, 
               owner_id: 7, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_7 = Listing.create(title: "Alpine Escape", 
               description: "Get away from it all in this serene alpine escape. Perfect for a peaceful retreat in the mountains!",
               lat: 46.676572, 
               long: 8.641186, 
               location: "Lenzerheide, Switzerland", 
               nightly_price: 175, 
               max_guests: 4, 
               num_bedrooms: 2, 
               num_beds: 2, 
               num_baths: 1, 
               owner_id: 8, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)


  listing_8 = Listing.create(title: "Vermont Mountain Retreat", 
               description: "Escape to the mountains in this cozy Vermont retreat. Perfect for a ski holiday!",
               lat: 44.259456, 
               long: -72.663558, 
               location: "Stowe, Vermont", 
               nightly_price: 200, 
               max_guests: 6, 
               num_bedrooms: 3, 
               num_beds: 6, 
               num_baths: 2, 
               owner_id: 9, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_9 = Listing.create(title: "Snowy Ridge Lodge", 
               description: "Experience the beauty of Vermont's mountains in this spacious lodge. Perfect for a ski holiday with friends or family!",
               lat: 44.175520, 
               long: -72.998630, 
               location: "Killington, Vermont", 
               nightly_price: 300, 
               max_guests: 10, 
               num_bedrooms: 5, 
               num_beds: 10, 
               num_baths: 3, 
               owner_id: 10, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_10 = Listing.create(title: "Mountain View Cottage", 
               description: "Wake up to stunning mountain views in this cozy cottage. Perfect for a romantic getaway!",
               lat: 43.694583, 
               long: -72.504667, 
               location: "Mount Snow, Vermont", 
               nightly_price: 250, 
               max_guests: 4, 
               num_bedrooms: 2, 
               num_beds: 4, 
               num_baths: 1, 
               owner_id: 11, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_11 = Listing.create(title: "Ski-In Ski-Out Condo", 
               description: "Enjoy easy access to the ski slopes in this ski-in ski-out condo. Perfect for a ski holiday!",
               lat: 44.435958, 
               long: -72.882548, 
               location: "Okemo, Vermont", 
               nightly_price: 300, 
               max_guests: 8, 
               num_bedrooms: 4, 
               num_beds: 8, 
               num_baths: 2, 
               owner_id: 12, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_12 = Listing.create(title: "Japanese Mountain Lodge", 
               description: "Escape to the mountains of Japan in this traditional Japanese lodge. Perfect for a ski holiday!",
               lat: 36.740131, 
               long: 137.867036, 
               location: "Hakuba, Japan", 
               nightly_price: 250, 
               max_guests: 6, 
               num_bedrooms: 3, 
               num_beds: 6, 
               num_baths: 2, 
               owner_id: 13, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_1.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_1_p1.jpg'), filename: 'l1p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_1_p2.jpg'), filename: 'l1p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_1_p3.jpg'), filename: 'l1p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_1_p4.jpg'), filename: 'l1p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_1_p5.jpg'), filename: 'l1p5.jpg'}
  ])

  listing_2.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_2_p1.jpg'), filename: 'l2p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_2_p2.jpg'), filename: 'l2p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_2_p3.jpg'), filename: 'l2p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_2_p4.jpg'), filename: 'l2p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_2_p5.jpg'), filename: 'l2p5.jpg'}
  ])

  listing_3.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_3_p1.jpg'), filename: 'l3p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_3_p2.jpg'), filename: 'l3p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_3_p3.jpg'), filename: 'l3p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_3_p4.jpg'), filename: 'l3p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_3_p5.jpg'), filename: 'l3p5.jpg'}
  ])

  listing_4.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_4_p1.jpg'), filename: 'l4p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_4_p2.jpg'), filename: 'l4p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_4_p3.jpg'), filename: 'l4p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_4_p4.jpg'), filename: 'l4p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_4_p5.jpg'), filename: 'l4p5.jpg'}
  ])

  listing_5.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_5_p1.jpg'), filename: 'l5p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_5_p2.jpg'), filename: 'l5p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_5_p3.jpg'), filename: 'l5p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_5_p4.jpg'), filename: 'l5p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_5_p5.jpg'), filename: 'l5p5.jpg'}
  ])

  listing_6.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_6_p1.jpg'), filename: 'l6p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_6_p2.jpg'), filename: 'l6p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_6_p3.jpg'), filename: 'l6p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_6_p4.jpg'), filename: 'l6p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_6_p5.jpg'), filename: 'l6p5.jpg'}
  ])

  listing_7.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_7_p1.jpg'), filename: 'l7p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_7_p2.jpg'), filename: 'l7p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_7_p3.jpg'), filename: 'l7p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_7_p4.jpg'), filename: 'l7p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_7_p5.jpg'), filename: 'l7p5.jpg'}
  ])

  listing_8.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_8_p1.jpg'), filename: 'l8p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_8_p2.jpg'), filename: 'l8p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_8_p3.jpg'), filename: 'l8p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_8_p4.jpg'), filename: 'l8p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_8_p5.jpg'), filename: 'l8p5.jpg'}
  ])

  listing_9.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_9_p1.jpg'), filename: 'l9p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_9_p2.jpg'), filename: 'l9p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_9_p3.jpg'), filename: 'l9p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_9_p4.jpg'), filename: 'l9p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_9_p5.jpg'), filename: 'l9p5.jpg'}
  ])

  listing_10.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_10_p1.jpg'), filename: 'l10p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_10_p2.jpg'), filename: 'l10p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_10_p3.jpg'), filename: 'l10p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_10_p4.jpg'), filename: 'l10p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_10_p5.jpg'), filename: 'l10p5.jpg'}
  ])

  listing_11.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_11_p1.jpg'), filename: 'l11p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_11_p2.jpg'), filename: 'l11p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_11_p3.jpg'), filename: 'l11p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_11_p4.jpg'), filename: 'l11p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_11_p5.jpg'), filename: 'l11p5.jpg'}
  ])

  listing_12.photos.attach([
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_12_p1.jpg'), filename: 'l12p1.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_12_p2.jpg'), filename: 'l12p2.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_12_p3.jpg'), filename: 'l12p3.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_12_p4.jpg'), filename: 'l12p4.jpg'},
    {io:URI.open('https://snowbnb-seeds.s3.amazonaws.com/listing_12_p5.jpg'), filename: 'l12p5.jpg'}
  ])

  Reservation.create!(
  user_id: 1,
  listing_id: 1,
  start_date: "2023-03-10 14:00:00",
  end_date: "2023-03-15 11:00:00",
  num_guests: 2,
  total_cost: 500
)

  Reservation.create!(
  user_id: 1,
  listing_id: 2,
  start_date: "2023-04-01 15:00:00",
  end_date: "2023-04-07 10:00:00",
  num_guests: 3,
  total_cost: 900
)

  Reservation.create!(
  user_id: 3,
  listing_id: 3,
  start_date: "2023-05-20 13:00:00",
  end_date: "2023-05-24 11:00:00",
  num_guests: 4,
  total_cost: 1200
)

  Reservation.create!(
  user_id: 4,
  listing_id: 4,
  start_date: "2023-06-10 14:00:00",
  end_date: "2023-06-15 11:00:00",
  num_guests: 2,
  total_cost: 600
)

  Reservation.create!(
  user_id: 5,
  listing_id: 5,
  start_date: "2023-07-01 12:00:00",
  end_date: "2023-07-05 10:00:00",
  num_guests: 3,
  total_cost: 900
)


  puts "Done!"
end

