class ProjectsController < ApplicationController
  def graphics
    @projects = Project.where(category: "graphics")
    @assets = Project.where(category: "assets")
  end

  def assets
  end

  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html  # Regular page load
      format.turbo_stream  # Turbo Stream response
    end
  end
end
