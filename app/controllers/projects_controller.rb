class ProjectsController < ApplicationController
  def graphics
    @projects = Project.where(category: "graphics")
    @assets = Project.where(category: "assets")
  end

  def assets
  end

  def show
    @project = Project.find(params[:id])
  end
end
