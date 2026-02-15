-- Update game thumbnails to use the public URLs
UPDATE games 
SET thumbnail_url = '/games/highway-hero-thumb.png'
WHERE slug = 'highway-hero';

UPDATE games 
SET thumbnail_url = '/games/pixel-python-thumb.png'
WHERE slug = 'pixel-python';
