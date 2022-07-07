sudo docker build -t snelf-backend-image -f Dockerfile . &&
sudo docker run -p 8000:8000 --rm --name snelf-container snelf-backend-image