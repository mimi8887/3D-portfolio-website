# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
puts 'Destroying all records...'
Project.destroy_all

puts 'Creating projects...'
gravestones = Project.create(name: "3D Assets for Yi Li", description: "3D Assets made for Yi Li")

puts 'Attaching photos'
gravestones.photo.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739545592/gravestone_jk0gxe.png"),
                         filename: "gravestone_cover_image.png", content_type: "image/png")
puts "Created #{Project.count} projects!"
