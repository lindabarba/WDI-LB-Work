class Experiment < ApplicationRecord
  belongs_to :scientist
  has_many :logs, dependent: :destroy
end
