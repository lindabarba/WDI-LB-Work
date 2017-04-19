class AddBankRefToAccount < ActiveRecord::Migration[5.0]
  def change
    add_reference :accounts, :bank, foreign_key: true
  end
end
