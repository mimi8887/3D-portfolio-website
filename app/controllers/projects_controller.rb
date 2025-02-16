class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    @template = case @project.category
                when "demon", "gingko", "vjs"
                  "video_only"
                when "gravestone"
                  "gravestone"
                when "ceramic_works"
                  "ceramics"
                when "swans"
                  "swans"
                when "penguins"
                  "penguins"
                else
                  "default"
                end
  end
end
