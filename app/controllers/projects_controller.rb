class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @template = case @project.category
                when "gravestone", "demon", "gingko"
                  "video_only"
                else
                  "default"
                end
  end
end
