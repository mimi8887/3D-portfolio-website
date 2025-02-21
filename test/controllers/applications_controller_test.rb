require "test_helper"

class ApplicationsControllerTest < ActionDispatch::IntegrationTest
  test "should get name:string" do
    get applications_name:string_url
    assert_response :success
  end

  test "should get description:string" do
    get applications_description:string_url
    assert_response :success
  end

  test "should get link:text" do
    get applications_link:text_url
    assert_response :success
  end
end
