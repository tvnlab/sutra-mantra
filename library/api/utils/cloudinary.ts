import cloudinary from 'cloudinary';

interface CloudinaryConfig {
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
}

class CloudinaryImageUploader {
  private cloudinaryConfig: CloudinaryConfig;

  constructor(config?: CloudinaryConfig) {
    this.cloudinaryConfig = {
      cloudName: config?.cloudName || process.env.CLOUDINARY_NAME,
      apiKey: config?.apiKey || process.env.CLOUDINARY_API_KEY,
      apiSecret: config?.apiSecret || process.env.CLOUDINARY_SECRET_KEY,
    };

    this.validateConfig();
    this.initializeCloudinary();
  }

  private validateConfig() {
    if (!this.cloudinaryConfig.cloudName || !this.cloudinaryConfig.apiKey || !this.cloudinaryConfig.apiSecret) {
      throw new Error('Cloudinary configuration missing. Make sure to set environment variables.');
    }
  }

  private initializeCloudinary() {
    cloudinary.v2.config({
      cloud_name: this.cloudinaryConfig.cloudName,
      api_key: this.cloudinaryConfig.apiKey,
      api_secret: this.cloudinaryConfig.apiSecret,
    });
  }

  async uploadImage(file: Express.Multer.File, folder?: string): Promise<string | null> {
    try {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: folder || 'default-upload-folder',
      });

      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.v2.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return false;
    }
  }
}

export default CloudinaryImageUploader;