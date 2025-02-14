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
gravestones = Project.create(name: "3D Assets for Yi Li", description: "3D Assets for Yi Li")
club_paradiso = Project.create(name: "Hikawa Yoshitaka, Poster and USB design", description: "USB album for japanese musician Hikawa Yoshitaka,
                               poster made for the launch party in Tokyo")
club_AI = Project.create(name: "Flyer Club 愛", description: "Digital Flyer made for Club 愛")
vj_video = Project.create(name: "VJ Work for Club 愛", description: "Digital Flyer made for Club 愛")


puts 'Attaching photos'
gravestones.photo.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739545592/gravestone_jk0gxe.png"),
                         filename: "gravestone_cover_image.png", content_type: "image/png")
club_paradiso.photo.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739552001/USB_kwvmxp.png"),
                           filename: "USBdesign.jpg", content_type: "image/jpg")
club_AI.photo.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739553718/poster1_rgyv4m.png"),
                     filename: "poster.png", content_type: "image/png")
vj_video.photo.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739552308/VJ_hddatw.png"),
                           filename: "VJwork.png", content_type: "image/png")
puts "Created #{Project.count} projects!"
