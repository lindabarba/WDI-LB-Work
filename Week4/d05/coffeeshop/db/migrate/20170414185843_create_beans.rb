class CreateBeans < ActiveRecord::Migration[5.0]
  def change
    create_table :beans do |t|
      t.string :name
      t.string :roast
      t.string :origin
      t.float :quantity

      t.timestamps
    end
  end
end
