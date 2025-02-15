class ChangeProjectPhotoToPhotos < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :photos, :json
  end
end
