package oauth

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"time"
)

// TransferClient NodeLoc 积分/余额转账客户端
// 由于 NodeLoc 官方转账 API 规范未公开，这里提供一个通用的 HTTP POST 调用骨架，
// 真实接入时按 NodeLoc 平台返回的字段做相应调整即可。
type TransferClient struct {
	APIURL    string
	Token     string
	Timeout   time.Duration
}

// TransferRequest 转账请求体
type TransferRequest struct {
	UserID     uint    `json:"user_id"`
	Username   string  `json:"username,omitempty"`
	Amount     float64 `json:"amount"`
	OutTradeNo string  `json:"out_trade_no"` // 商户单号（提现申请ID）
	Remark     string  `json:"remark,omitempty"`
}

// TransferResponse 转账响应
type TransferResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	TxID    string `json:"tx_id"`
}

// NewTransferClient 创建转账客户端
func NewTransferClient(apiURL, token string) *TransferClient {
	return &TransferClient{
		APIURL:  apiURL,
		Token:   token,
		Timeout: 15 * time.Second,
	}
}

// Transfer 发起转账
func (c *TransferClient) Transfer(req *TransferRequest) (*TransferResponse, error) {
	if c.APIURL == "" {
		return nil, errors.New("transfer API not configured")
	}
	body, _ := json.Marshal(req)
	httpReq, err := http.NewRequest("POST", c.APIURL, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")
	if c.Token != "" {
		httpReq.Header.Set("Authorization", "Bearer "+c.Token)
	}

	client := &http.Client{Timeout: c.Timeout}
	resp, err := client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	respBody, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("transfer api http %d: %s", resp.StatusCode, string(respBody))
	}
	var tr TransferResponse
	if err := json.Unmarshal(respBody, &tr); err != nil {
		return nil, fmt.Errorf("transfer api decode: %v body=%s", err, string(respBody))
	}
	if tr.Code != 0 {
		return nil, fmt.Errorf("transfer failed: %s", tr.Message)
	}
	return &tr, nil
}
