class CreateExperiments < ActiveRecord::Migration[5.0]
  def change
    create_table :experiments do |t|
      t.text :summary
      t.integer :budget
      t.references :scientist, foreign_key: true

      t.timestamps
    end
  end
end
