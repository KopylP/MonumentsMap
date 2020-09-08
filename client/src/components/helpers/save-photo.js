export default function savePhoto(link) {
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: link,
      };
      // server sent the url to the file!
      // now, let's download:
      window.open(response.file);
      // you could also do:
      // window.location.href = response.file;
    }, 100);
  }