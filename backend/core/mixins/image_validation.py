from PIL import Image
from rest_framework.exceptions import ValidationError


class ImageValidationMixin:
    allowed_mime_types = ['image/jpeg', 'image/jpg', 'image/png']

    def validate_and_save_images(self, images, instance, related_model, fk_name, image_field_name='image'):
        for image in images:
            if image.content_type not in self.allowed_mime_types:
                raise ValidationError({
                    "images": ["Only .jpg, .jpeg, .png formats are allowed."]
                })

            try:
                img = Image.open(image)
                img.verify()
            except Exception:
                raise ValidationError({
                    "images": ["The uploaded file is not a valid image or is corrupted."]
                })

            image.seek(0)

            kwargs = {fk_name: instance, image_field_name: image}
            related_model.objects.create(**kwargs)
