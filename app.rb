require 'sinatra'
require 'sinatra/activerecord'
require 'slim'

class Score < ActiveRecord::Base
end

class GanoffTk < Sinatra::Base
  get '/' do
    redirect '/index.html'
  end
end
