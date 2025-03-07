class ProjectsController < ApplicationController
  def graphics
    @projects = Project.where(category: "graphics")
  end

  def show
    @project = Project.find(params[:id])
  end
end
