json.user do
  json.extract! @user, :id, :email, :username, :created_at, :updated_at, :first_name, :last_name
  json.reserved_listing_id @listing_ids
end

# {
#   user: {
#     id: 1,
#     email: "user@demo.com"
#     username: "xxxx"
#   }
# }