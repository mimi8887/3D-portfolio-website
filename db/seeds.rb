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
club_ai = Project.create(name: "Flyer Club 愛", description: "Digital Flyer made for Club 愛")
vj_video = Project.create(name: "VJ Work for Club 愛", description: "Digital Flyer made for Club 愛")
gingko = Project.create(name: "gingko", description: "other time")
ernie_castle = Project.create(name: "3D modelling for Ernie Wang", description: "3D modelling for Efermidis Gallery")
juan_carlos = Project.create(name: "Juan Carlos avatar", description: "Avatar for Conversation in a crosstown algorithm")
gentle_leash = Project.create(name: "Gentle Leash", description: "Poster for PanAsian event in Hamburg")
smart_city = Project.create(name: "Smart City", description: "3D animation short video")

puts 'Attaching photos'

gravestones.photos.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739545592/gravestone_jk0gxe.png"), filename: "gravestone.png")
gravestones.videos.attach([
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739545415/video_1_o798cz.mp4"), filename: "gravestone.mp4"},
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739545038/butterfly_bh2lgp.mp4"), filename: "butterfly.mp4"},
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739544977/magicalstick_do8ulj.mp4"), filename: "magicalstick.mp4"},
  ])

club_paradiso.photos.attach([
   {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739552001/USB_kwvmxp.png"), filename: "USBdesign.png"},
   {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544929/USB_cmjm_BACKrere_ncbj4y.jpg"), filename: "USBdesignback.jpg"},
   {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544918/club_glhfg5.png"), filename: "poster.jpg"}])


club_ai.photos.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739553718/poster1_rgyv4m.png"),
                      filename: "poster.png")
club_ai.videos.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739544974/HD_01_e9hgpg.mp4"),
                      filename: "poster.mp4")

vj_video.photos.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739660641/STAR_CIRCLE_-_frame_at_0m4s_tpyscr.jpg"),
                       filename: "VJwork.png")
vj_video.videos.attach([io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739544960/wings_hqyeo4.mp4"), filename: "wings.mp4"])

ernie_castle.photos.attach([
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544934/image4_btk5ts.png"), filename: "image_front.png"},
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544918/221206_KW_0094_HQ_1_iblywu.jpg"), filename: "original_image.jpg"},
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544952/image2_oa2rmy.png"), filename: "zoom_view.png"}])

juan_carlos.photos.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739647463/jC_osvkr9.png"), filename: "Juan_Carlos.png")

gentle_leash.photos.attach([
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739648423/cover_nlbxob.jpg"), filename: "cover.jpg"},
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739660281/A2_poster_blue_tfuqab.jpg"), filename: "poster.jpg"}
  ])


smart_city.photos.attach([{io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544920/SmartCity_2022_Moment_cdte3p.jpg"), filename: "smart_city.jpg"},
                          {io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739544918/installationview_loyemk.jpg"), filename: "smart_city_installation.jpg"}])

gingko.photos.attach(io: URI.open("https://res.cloudinary.com/dlmjemn37/image/upload/v1739650112/tang_bpbfla.jpg"), filename: "gingko.jpg")

gingko.videos.attach([
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739661433/gingko_g8xkgm.mp4"), filename: "poster.mp4"},
  {io: URI.open("https://res.cloudinary.com/dlmjemn37/video/upload/v1739661446/gingko_all_q99vbh.mp4"), filename: "poster.mp4"}])

puts "Created #{Project.count} projects!"
