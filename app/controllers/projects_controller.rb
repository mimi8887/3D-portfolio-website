class ProjectsController < ApplicationController
  def graphics
    @projects = Project.where(category: "graphics")
  end

  def assets
    @projects = Project.where(category: "assets")
  end

  def show
    @project = Project.find(params[:id])
  end
end
