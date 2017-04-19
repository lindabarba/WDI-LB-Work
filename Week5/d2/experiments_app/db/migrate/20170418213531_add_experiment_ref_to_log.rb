class AddExperimentRefToLog < ActiveRecord::Migration[5.0]
  def change
    add_reference :logs, :experiment, foreign_key: true
  end
end
