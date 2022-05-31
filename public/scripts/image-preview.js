//target the input element
const imagePickerElement = document.querySelector('#image-upload-control input');

//target the image preview element
const imagePreviewElement = document.querySelector('#image-upload-control img');


//update image preview function

function updateImagePreview() {

    //get the list of all files selected
    const files = imagePickerElement.files;

    //checking the existence of the files
    if (!files || files.length === 0) {
        //no file picked set the display to none
        imagePreviewElement.style.display = "none";
        return;
    }
    
    //picked files select
    const pickedFile = files[0];

    //create the URL for src of the image
    imagePreviewElement.src = URL.createObjectURL(pickedFile);

    //set the display for the image preview elelement
    imagePreviewElement.style.display = 'block';

}


//change addEventLister to imagePickerElement
imagePickerElement.addEventListener('change',updateImagePreview);
