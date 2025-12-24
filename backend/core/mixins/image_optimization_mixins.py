# Serializer Image Optimization Mixin
import os
import tempfile
from django.conf import settings
from rest_framework import serializers

from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage


class OptimizedImageSerializerMixin:
    def get_optimized_image_url(self, obj, field_name):
        image_field = getattr(obj, field_name)
        if not image_field:
            return None

        try:
            image_path = image_field.path
            image_url = image_field.url
            image_name = os.path.splitext(os.path.basename(image_field.name))[0]

            if not os.path.exists(image_path):
                return self.context['request'].build_absolute_uri(image_url)

            file_size_kb = os.path.getsize(image_path) / 1024  # in KB

            # Only optimize if the image is <= 800 KB
            if file_size_kb <= 800:
                with Image.open(image_path) as img:
                    img_format = img.format or 'JPEG'

                    # Try quality values to get between 450–550KB
                    quality_min, quality_max = 10, 95
                    final_buffer = None

                    while quality_min <= quality_max:
                        quality_mid = (quality_min + quality_max) // 2
                        buffer = BytesIO()
                        img.save(buffer, format=img_format, optimize=True, quality=quality_mid)
                        size_kb = buffer.tell() / 1024

                        if 450 <= size_kb <= 550:
                            final_buffer = buffer
                            break
                        elif size_kb < 450:
                            quality_min = quality_mid + 1
                        else:
                            quality_max = quality_mid - 1

                    # If successful resizing
                    if final_buffer:
                        buffer = final_buffer
                        buffer.seek(0)

                        temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
                        os.makedirs(temp_dir, exist_ok=True)

                        temp_filename = f"{obj.id}_{image_name}_optimized.{img_format.lower()}"
                        temp_path = os.path.join(temp_dir, temp_filename)

                        with open(temp_path, 'wb') as f:
                            f.write(buffer.getvalue())

                        return self.context['request'].build_absolute_uri(f"/media/temp/{temp_filename}")

        except Exception as e:
            print("Image optimization failed:", e)

        # Fallback to original
        return self.context['request'].build_absolute_uri(getattr(obj, field_name).url)


# class OptimizedImageSerializerMixin:
#     def get_optimized_image_url(self, obj, field_name):
#         from django.conf import settings
#         image_field = getattr(obj, field_name)
#         if not image_field:
#             return None
#
#         try:
#             image_path = image_field.path
#             image_url = image_field.url
#             image_name = os.path.splitext(os.path.basename(image_field.name))[0]
#
#             if not os.path.exists(image_path):
#                 return self.context['request'].build_absolute_uri(image_url)
#
#             file_size_kb = os.path.getsize(image_path) / 1024  # in KB
#
#             # Only optimize if the image is ≤800KB
#             if file_size_kb <= 800:
#                 with Image.open(image_path) as img:
#                     img_format = img.format or 'JPEG'
#
#                     # Resize or re-encode with fixed quality
#                     buffer = BytesIO()
#                     img.save(buffer, format=img_format, optimize=True, quality=85)
#                     buffer.seek(0)
#                     new_size_kb = len(buffer.getvalue()) / 1024
#
#                     # Proceed only if size is reduced or reasonable
#                     if new_size_kb < file_size_kb and new_size_kb <= 600:
#                         temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
#                         os.makedirs(temp_dir, exist_ok=True)
#
#                         temp_filename = f"{obj.id}_{image_name}_optimized.{img_format.lower()}"
#                         temp_path = os.path.join(temp_dir, temp_filename)
#
#                         with open(temp_path, 'wb') as f:
#                             f.write(buffer.getvalue())
#
#                         return self.context['request'].build_absolute_uri(f"/media/temp/{temp_filename}")
#
#         except Exception as e:
#             print("Image optimization failed:", e)
#
#         # Fallback to original
#         return self.context['request'].build_absolute_uri(image_field.url)


# class OptimizedImageSerializerMixin:
#     def get_optimized_image_url(self, obj, field_name):
#         from django.conf import settings
#         image_path = getattr(obj, field_name).path
#         image_name = os.path.splitext(os.path.basename(getattr(obj, field_name).name))[0]
#
#         if os.path.exists(image_path):
#             file_size_mb = os.path.getsize(image_path) / (1024 * 1024)
#             if file_size_mb > 6:
#                 try:
#                     with Image.open(image_path) as img:
#                         img_format = img.format or 'JPEG'
#                         buffer = BytesIO()
#                         img.save(buffer, format=img_format, optimize=True, quality=85)
#
#                         buffer.seek(0)
#
#                         temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp')
#                         os.makedirs(temp_dir, exist_ok=True)
#
#                         temp_filename = f"{obj.id}_{image_name}_optimized.{img_format.lower()}"
#                         temp_path = os.path.join(temp_dir, temp_filename)
#
#                         with open(temp_path, 'wb') as f:
#                             f.write(buffer.getvalue())
#
#                         return self.context['request'].build_absolute_uri(f"/media/temp/{temp_filename}")
#                 except Exception as e:
#                     print("Image optimization failed:", e)
#
#         return self.context['request'].build_absolute_uri(getattr(obj, field_name).url)
