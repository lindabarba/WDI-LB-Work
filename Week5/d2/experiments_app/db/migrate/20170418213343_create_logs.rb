class CreateLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :logs do |t|
      t.string :subject_name
      t.text :comment
      t.boolean :deceased

      t.timestamps
    end
  end
end
