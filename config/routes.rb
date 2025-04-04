Rails.application.routes.draw do
  root to: "pages#home"
  # root to: "projects#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  resources :projects, only: [:show]
  get '/graphics', to: 'projects#graphics', as: 'graphics'
  get '/assets', to: 'projects#assets', as: 'assets'
  get "/showreel", to: "showreel#show"
  get "/apps", to: "apps#index"
  get 'resume', to: 'resume#show'
  get 'form', to: 'form#show'
end
