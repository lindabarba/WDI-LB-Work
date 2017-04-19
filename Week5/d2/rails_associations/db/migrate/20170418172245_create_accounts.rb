class CreateAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :accounts do |t|
      t.integer :acct_no
      t.boolean :is_savings
      t.float :balance

      t.timestamps
    end
  end
end
