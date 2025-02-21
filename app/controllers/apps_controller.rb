class AppsController < ApplicationController

  def index
    @applications = Application.all
  end

end
