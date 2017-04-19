class Scientist < ApplicationRecord
  after_initialize :set_defaults

  has_many :experiments, dependent: :destroy

private

  def set_defaults
    self.discipline = "General Science" if self.discipline.nil?
  end

end
