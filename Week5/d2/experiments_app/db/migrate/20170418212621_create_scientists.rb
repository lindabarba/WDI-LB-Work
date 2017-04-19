class CreateScientists < ActiveRecord::Migration[5.0]
  def change
    create_table :scientists do |t|
      t.string :name
      t.string :discipline
      t.boolean :mad, default: true

      t.timestamps
    end
  end
end
