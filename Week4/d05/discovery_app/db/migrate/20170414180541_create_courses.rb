class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :course_name
      t.integer :room
      t.boolean :challenging

      t.timestamps
    end
  end
end
