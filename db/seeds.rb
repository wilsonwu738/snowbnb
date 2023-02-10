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
  # User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  # ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')


  # puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  # User.create!(
  #   username: 'Demo-lition', 
  #   email: 'demo@user.io', 
  #   password: 'password'
  # )

  # More users
  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end

  Listing.create!(title: "Cozy Studio in the Heart of the City",
                 description: "Enjoy a comfortable stay in this charming studio located in the heart of the city. Perfect for solo travelers or couples.",
                 lat: 37.7749,
                 long: -122.4194,
                 location: "San Francisco, CA",
                 nightly_price: 85,
                 max_guests: 2,
                 num_bedrooms: 1,
                 num_beds: 1,
                 num_baths: 1,
                 owner_id: 1,
                 created_at: Time.now,
                 updated_at: Time.now)

Listing.create!(title: "Spacious 2BR Apartment with a View",
                 description: "Relax in this spacious 2-bedroom apartment with stunning views of the city. Ideal for families or small groups of friends.",
                 lat: 40.7128,
                 long: -74.0060,
                 location: "New York, NY",
                 nightly_price: 150,
                 max_guests: 4,
                 num_bedrooms: 2,
                 num_beds: 2,
                 num_baths: 2,
                 owner_id: 2,
                 created_at: Time.now,
                 updated_at: Time.now)

Listing.create!(title: "Luxury Villa with Private Pool",
                 description: "Indulge in a luxurious vacation at this beautiful villa with its own private pool. Perfect for a romantic getaway or a family vacation.",
                 lat: 34.0522,
                 long: -118.2437,
                 location: "Los Angeles, CA",
                 nightly_price: 250,
                 max_guests: 6,
                 num_bedrooms: 3,
                 num_beds: 3,
                 num_baths: 2,
                 owner_id: 3,
                 created_at: Time.now,
                 updated_at: Time.now)

Listing.create!(title: "Charming Country Cottage",
                 description: "Escape to this charming country cottage surrounded by nature. Perfect for a peaceful and relaxing vacation.",
                 lat: 51.5074,
                 long: -0.1278,
                 location: "London, England",
                 nightly_price: 90,
                 max_guests: 4,
                 num_bedrooms: 2,
                 num_beds: 2,
                 num_baths: 1,
                 owner_id: 4,
                 created_at: Time.now,
                 updated_at: Time.now)

Listing.create!(title: "Stylish Studio in the Trendy Neighborhood",
                 description: "Stay in this stylish studio located in the heart of a trendy neighborhood. Perfect for urban adventurers.",
                 lat: 41.8818,
                 long: -87.6298,
                 location: "Chicago, IL",
                 nightly_price: 70,
                 max_guests: 2,
                 num_bedrooms: 1,
                 num_beds: 1,
                 num_baths: 1,
                 owner_id: 5,
                 created_at: Time.now,
                 updated_at: Time.now)


  puts "Done!"
end