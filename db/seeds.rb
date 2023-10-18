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
  Review.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')
  ApplicationRecord.connection.reset_pk_sequence!('reservations')
  ApplicationRecord.connection.reset_pk_sequence!('reviews')
  
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

  puts "Creating listings..."

  listing_1 = Listing.create(title: "Cozy Mountain Chalet", 
               description: "The 'Cozy Mountain Chalet' is a charming, rustic retreat located near the ski slopes in Breckenridge, Colorado. Perfect for a winter getaway, this cozy cabin features 2 bedrooms, 3 beds, and 2 baths, making it ideal for up to 6 guests. With its warm and inviting decor, fully-equipped kitchen, and beautiful mountain views, you'll feel right at home in this delightful chalet.",
               lat: 39.742043, 
               long: -104.991531, 
               location: "Breckenridge, CO, United States", 
               nightly_price: 150, 
               max_guests: 6, 
               num_bedrooms: 2, 
               num_beds: 3, 
               num_baths: 2, 
               owner_id: 2, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_2 = Listing.create(title: "Mountain View Lodge", 
               description: "'Mountain View Lodge' is a spacious and luxurious vacation rental nestled in the heart of Nederland, Colorado. This stunning lodge can accommodate up to 10 guests and features 4 bedrooms, 6 beds, and 3 baths. From its soaring ceilings and stone fireplace to its stunning mountain views, this lodge is the perfect setting for a large family or group of friends looking to enjoy the great outdoors in style.",
               lat: 40.027435, 
               long: -105.251961, 
               location: "Nederland, CO, United States", 
               nightly_price: 250, 
               max_guests: 10, 
               num_bedrooms: 4, 
               num_beds: 6, 
               num_baths: 3, 
               owner_id: 2, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_3 = Listing.create(title: "Rustic Mountain Cabin", 
               description: "The 'Rustic Mountain Cabin' is a charming, secluded retreat located in the peaceful forests of Kansas City, Missouri. This cozy cabin is perfect for a romantic getaway or a solo retreat, with 1 bedroom, 2 beds, and 1 bath. With its warm and welcoming decor, fully-equipped kitchen, and peaceful surroundings, this cabin is the perfect place to unwind and reconnect with nature.",
               lat: 39.099727, 
               long: -94.578567, 
               location: "Kansas City, MO, United States", 
               nightly_price: 100, 
               max_guests: 4, 
               num_bedrooms: 1, 
               num_beds: 2, 
               num_baths: 1, 
               owner_id: 3, 
               created_at: DateTime.now, 
               updated_at: DateTime.now)

  listing_4 = Listing.create(title: "Chalet Les Alpes", 
               description: "'Chalet Les Alpes' is a beautiful and luxurious vacation rental located in the heart of Verbier, Switzerland. With its breathtaking mountain views, cozy decor, and 2 bedrooms, 4 beds, and 2 baths, this chalet is the perfect setting for a ski holiday with family or friends. Relax in front of the fireplace after a long day on the slopes, or take in the stunning views from the balcony.",
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
               description: "'Mountain View Suite' is a stunning vacation rental located in the picturesque town of Crans-Montana, Switzerland. With its spacious layout, luxurious amenities, and breathtaking mountain views, this suite is the perfect setting for a romantic getaway for two. Featuring 1 bedroom, 1 bed, and 1 bath, this suite is the perfect place to relax, unwind, and take in the beauty of the Swiss Alps.",
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
               description: "'Alpine Chalet Zermatt' is a beautiful and spacious vacation rental located in the heart of Zermatt, Switzerland. With its warm and inviting decor, 3 bedrooms, 6 beds, and 2 baths, this chalet is the perfect setting for a ski holiday with family or friends. Enjoy the stunning views from the balcony, relax in front of the fireplace, or cook a meal in the fully-equipped kitchen.",
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
               description: "'Alpine Escape' is a serene and peaceful vacation rental located in the beautiful town of Lenzerheide, Switzerland. With its quiet and secluded location, 2 bedrooms, 2 beds, and 1 bath, this rental is the perfect place to get away from it all and reconnect with nature. Enjoy the beautiful mountain views from the balcony, or take a hike in the surrounding forest.",
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
               description: "The 'Vermont Mountain Retreat' is a cozy and inviting vacation rental located in the heart of Stowe, Vermont. With its warm and rustic decor, fully-equipped kitchen, and 3 bedrooms, 6 beds, and 2 baths, this retreat is the perfect setting for a ski holiday with family or friends. Relax in front of the fireplace, take in the stunning views from the balcony, or explore the charming town of Stowe.",
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
               description: "'Snowy Ridge Lodge', is a spacious lodge located in Killington, Vermont, that offers stunning views of Vermont's mountains. This is the perfect place for a ski holiday with friends or family, as it can accommodate up to 10 guests in its 5 bedrooms with 10 beds and 3 bathrooms. The nightly price is reasonable at $300 per night, given the number of guests it can accommodate. The owner has taken great care to make the lodge as comfortable as possible, and guests can enjoy amenities such as a cozy fireplace, modern kitchen, and comfortable furnishings.",
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
               description: "'Mountain View Cottage', is a cozy cottage located in Mount Snow, Vermont, that is ideal for a romantic getaway. Guests can wake up to breathtaking mountain views every morning from the comfort of the cottage. The nightly price of $250 is quite reasonable for a property that can accommodate up to 4 guests in its 2 bedrooms with 4 beds and 1 bathroom. The owner has taken great care to make the cottage as comfortable as possible, and guests can enjoy amenities such as a well-equipped kitchen, comfortable furnishings, and a charming fireplace.",
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
               description: "'Ski-In Ski-Out Condo', is a modern and comfortable condo located in Okemo, Vermont, that offers easy access to the ski slopes. The nightly price of $300 is reasonable for a property that can accommodate up to 8 guests in its 4 bedrooms with 8 beds and 2 bathrooms. The owner has taken great care to make the condo as comfortable as possible, and guests can enjoy amenities such as a modern kitchen, comfortable furnishings, and easy access to the slopes.",
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
               description: "'Japanese Mountain Lodge', is a traditional Japanese lodge located in Hakuba, Japan, that offers a unique experience for those looking to escape to the mountains. The nightly price of $250 is reasonable for a property that can accommodate up to 6 guests in its 3 bedrooms with 6 beds and 2 bathrooms. The owner has taken great care to ensure that the lodge provides a comfortable and authentic Japanese experience, with amenities such as tatami floors, Japanese-style beds, and a beautiful hot spring bath. This is the perfect place for those looking to immerse themselves in Japanese culture while enjoying the beauty of the mountains.",
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

  puts "Creating reservations..."

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

  puts "Creating reviews..."

  (1..7).each do |i|
    start_date = Date.new(2023, 2, 1) - i.months
    end_date = start_date + 5.days

    Reservation.create(
      user_id: i, 
      listing_id: 1,
      start_date: start_date, 
      end_date: end_date,
      num_guests: 2,
      total_cost: 1000
    )
  end

  Review.create!(
    user_id: 1,
    listing_id: 1,
    content: "Nice house",
    communication: 5,
    cleanliness: 5,
    accuracy: 5,
    location: 5,
    value: 5,
    check_in: 5
  )

  Review.create!(
    user_id: 2,
    listing_id: 1,
    content: "Not bad for the price",
    communication: 4,
    cleanliness: 4,
    accuracy: 4,
    location: 5,
    value: 5,
    check_in: 5
  )

  Review.create!(
    user_id: 3,
    listing_id: 1,
    content: "Worst house, would not recommend",
    communication: 1,
    cleanliness: 1,
    accuracy: 1,
    location: 1,
    value: 1,
    check_in: 1
  )

  Review.create!(
    user_id: 4,
    listing_id: 1,
    content: "Best airbnb snow house i had so far",
    communication: 5,
    cleanliness: 5,
    accuracy: 5,
    location: 5,
    value: 5,
    check_in: 5
  )

  Review.create!(
    user_id: 5,
    listing_id: 1,
    content: "It's only ok",
    communication: 3,
    cleanliness: 3,
    accuracy: 3,
    location: 3,
    value: 3,
    check_in: 3
  )

  Review.create!(
    user_id: 6,
    listing_id: 1,
    content: "Host is nice, I would recommend",
    communication: 5,
    cleanliness: 5,
    accuracy: 5,
    location: 4,
    value: 4,
    check_in: 5 
  )

  Review.create!(
    user_id: 7,
    listing_id: 1,
    content: "average airbnb house",
    communication: 3,
    cleanliness: 4,
    accuracy: 3,
    location: 3,
    value: 4,
    check_in: 5
  )


  puts "Done!"
end

