<?
class ModelCatalogDisplaycat extends Model {
	
	//получаем подкатегории
	public function getSubcat ($category_id) {
		$query = $this->db->query("SELECT name, category_id, parent_id FROM category_description
		NATURAL JOIN category
		WHERE parent_id=" . $category_id);
		return $query->rows;
	} 
	
	

	
	public function getProductUrl($product_id) {
		$q_value = "'product_id=$product_id'";
		$query = $this->db->query("SELECT keyword FROM url_alias WHERE query=" . $q_value);
		if(isset($query->rows[0]['keyword'])) {
		return $query->rows[0]['keyword'];		
		}
		else{
		return 0;
		}
	}
	
	public function getCategoryUrl($category_id) {
		$q_value = "'category_id=$category_id'";
		$query = $this->db->query("SELECT keyword FROM url_alias WHERE query=" . $q_value );
		if(isset($query->rows[0]['keyword'])) {
		return $query->rows[0]['keyword'];
		}
		else{
		return 0;
		}
		
	}
	
	/*  public function dataSort($data) {
		function cmp($a, $b) {
			return strcmp($a['sort_order'], $b['sort_order']);
		}
		usort($data, 'cmp');
	}  */
	
		public function getProducts ($category_id) {
		$data = array(); 
		$query = $this->db->query("SELECT product_id, name, image, price, category_id FROM product NATURAL JOIN product_description NATURAL JOIN product_to_category WHERE category_id=" . $category_id . " ORDER BY sort_order");
		foreach($query->rows as $row) {
			$row['seo_url'] = $this->getProductUrl($row['product_id']);
			$data[] = $row;
		}
		return $data;
	}
	
	public function getCatalog ($category_id = 0) {
		/* $root_cat = array(); */
		$data = array();
		$query = $this->db->query("SELECT name, category_id, parent_id, sort_order
		FROM category_description
		NATURAL JOIN category
		WHERE parent_id=" . $category_id . " ORDER BY sort_order");
		foreach ($query->rows as $row) {
				$row['child'] = array();
				$row ['child'] = $this->getCatalog($row['category_id']);
				$row['products'] = array();
				$row['products'] = $this->getProducts($row['category_id']);
				$row['seo_url'] = $this->getCategoryUrl($row['category_id']);
				$data[] = $row;
				/* $this->dataSort($data); */
			}
		return $data;
	}
	
	
}	
	

	

	