require 'sinatra'
require 'sinatra/activerecord'
require 'slim'

class Score < ActiveRecord::Base
end

class GanoffTk < Sinatra::Base
  get '/' do
    redirect '/index.html'
  end

  get '/results' do
    @scores = Score.all.order('score DESC')

    slim :results
  end

  post '/register' do
    Score.create(name: params[:name], score: params[:score])
  end
end
