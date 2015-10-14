require 'sinatra'

class GanoffTk < Sinatra::Base
  get '/' do
    redirect '/index.html'
  end
end
