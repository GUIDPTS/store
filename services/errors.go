package services

import "strconv"

// ServiceError 服务错误
type ServiceError struct {
	Message string
}

func (e *ServiceError) Error() string {
	return e.Message
}

// IntToString 整数转字符串
func IntToString(i int) string {
	return strconv.Itoa(i)
}

// StringToFloat 字符串转 float64（带默认值）
func StringToFloat(s string, def float64) float64 {
	if s == "" {
		return def
	}
	v, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return def
	}
	return v
}
