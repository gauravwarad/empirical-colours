import io
from docx import Document
from PIL import Image
import os

def extract_images_from_docx(docx_file, output_folder):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    doc = Document(docx_file)

    for i, image in enumerate(doc.inline_shapes):
        image_bytes = image._inline.graphic.graphicData.pic.blipFill.blip.embed
        image_data = doc.part.related_parts[image_bytes].blob
        img = Image.open(io.BytesIO(image_data))
        img.save(f"{output_folder}/image_{i + 1}.png", "PNG")
        # img.save(f"{output_folder}/image_{i + 1}.jpg", "JPG")

    print(f"Images extracted and saved in '{output_folder}' folder.")

docx_file_name = 'Paintings.docx'
output_folder_name = 'assets/img'

extract_images_from_docx(docx_file_name, output_folder_name)
