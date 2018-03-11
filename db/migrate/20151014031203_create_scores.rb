class CreateScores < ActiveRecord::Migration[4.2]
  def change
    create_table :scores do |t|
      t.string :name
      t.integer :score
    end
  end
end
