import { useEffect, useState } from "react";
import classNames from "classnames";
import { createGIF } from 'gifshot';
import Navbar from "src/components/Navbar";
import Input from "src/components/Input";
import Button from "src/components/Button";
import UploadFile from "src/components/UploadFile";
import styles from "./index.module.scss";

const GifCreator = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const [interval, setInterval] = useState('')
  const [gif, setGif] = useState(null);
  const [gifCreated, setGifCreated] = useState(false);
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);
  const [images, setImages] = useState([
    { previewUrl: '' },
    { previewUrl: '' },
    { previewUrl: '' }
  ])

  useEffect(() => {
    const isImagesUploaded = images.every(image => {
      return image.previewUrl !== ''
    });
    setIsImagesUploaded(isImagesUploaded);
  }, [images])

  const handleActiveFrame = (index) => {
    setActiveFrame(index);
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (event) => {
      const { result } = event.target;
      if (result) {
        const _images = images.map((image, index) => {
          if (index === activeFrame) {
            image.previewUrl = result;
            image.file = file
          }
          return image;
        });
        setImages(_images);
      }
    }
    fileReader.readAsDataURL(file);
  }

  const handleIntervalChange = (event) => {
    const { value } = event.target;
    setInterval(value)
  }

  const handleCreateGif = () => {
    const imagesLink = images.map((image) => {
      return image.previewUrl;
    });
    const options = {
      images: imagesLink,
      gifWidth: 500,
      gifHeight: 400,
      frameDuration: interval
    }
    createGIF(options, (obj) => {
      if (!obj.error) {
        let image = obj.image;
        setGif(image);
        setGifCreated(true)
      } else {
        console.log(obj.error)
      }
    })
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'sample.gif';
    link.href = gif;
    link.click();
  }

  return (
    <>
      <Navbar />
      <div className={classNames("d-flex", styles.responsiveContainer)}>
        <div className={classNames("grow", styles.container)}>
          {images.map((image, index) => (
            <>
              <div className={classNames('d-flex justify-content-center align-items-center', styles.imageViewer,
                { [styles.active]: activeFrame === index }
              )}>
                <div className={classNames('d-flex justify-content-center align-items-center', styles.imagePreview)}>
                  {image.previewUrl === '' ? <p>Please upload a image</p> : <img src={image.previewUrl} />}
                </div>
                <div className={classNames('d-flex justify-content-center')}>
                  <UploadFile onChange={handleUpload} />
                </div>
              </div>
            </>
          ))}
          <div className="d-flex justify-content-evenly">
            {images.map((item, index) => {
              return <div><Button key={index} isActive={index === activeFrame} onClick={event => handleActiveFrame(index)}>{index +  1}</Button></div>
            })}
          </div>
        </div>
        <div className={classNames("grow", styles.container)}>
          <div className={classNames('d-flex justify-content-center align-items-center', styles.gifViewer)}>
            {gif === null ? <p>Gif viewer</p> : <img src={gif} />}
          </div>
          <div className={classNames("d-flex justify-content-between", styles.buttonContainer)}>
            <Input placeholder="Interval" value={interval} onChange={handleIntervalChange} />
            <Button onClick={handleCreateGif} disabled={!(isImagesUploaded && interval !== '')}>Create gif</Button>
          </div>
          <div className="d-flex justify-content-center">
            <Button disabled={!gifCreated} onClick={handleDownload}>Download</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default GifCreator;