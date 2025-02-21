class CreateApplications < ActiveRecord::Migration[7.1]
  def change
    create_table :applications do |t|
      t.string :name
      t.string :description
      t.text :link

      t.timestamps
    end
  end
end
