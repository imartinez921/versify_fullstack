json.artist do
    json.extract! @artist, :id, :name, :photo_url
end
