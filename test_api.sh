#!/bin/bash

BASE_URL="http://localhost:3000/api/recipes"

echo "1. GET All Recipes"
curl -s "$BASE_URL" | grep "Ratatouille Provençale" && echo "PASS" || echo "FAIL"
echo ""

echo "2. GET Recipe by ID (1)"
curl -s "$BASE_URL/1" | grep "Ratatouille Provençale" && echo "PASS" || echo "FAIL"
echo ""

echo "3. CREATE Recipe"
CREATE_RES=$(curl -s -X POST "$BASE_URL" -H "Content-Type: application/json" -d '{"name": "Test Recipe", "ingredients": ["ing1"], "instructions": "test", "prepTime": 10}')
echo $CREATE_RES
NEW_ID=$(echo $CREATE_RES | grep -o '"id":[0-9]*' | cut -d':' -f2)
echo "Created ID: $NEW_ID"
echo ""

if [ -z "$NEW_ID" ]; then
  echo "Failed to create recipe"
  exit 1
fi

echo "4. UPDATE Recipe ($NEW_ID)"
curl -s -X PUT "$BASE_URL/$NEW_ID" -H "Content-Type: application/json" -d '{"prepTime": 99}' | grep '"prepTime":99' && echo "PASS" || echo "FAIL"
echo ""

echo "5. SEARCH Recipe ('Test')"
curl -s "$BASE_URL/search?search=Test" | grep "Test Recipe" && echo "PASS" || echo "FAIL"
echo ""

echo "6. DELETE Recipe ($NEW_ID)"
curl -s -X DELETE "$BASE_URL/$NEW_ID" | grep "supprimée avec succès" && echo "PASS" || echo "FAIL"
echo ""

echo "7. VERIFY DELETE (should be 404)"
curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$NEW_ID" | grep "404" && echo "PASS" || echo "FAIL"
echo ""
